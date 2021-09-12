/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/naming-convention */
import type {GradientValue} from './types';

export const serializeGradient = (function () {
  const visitor: {[key: string]: any} = {
    visit_linear(node: any): any {
      return visitor.visit_gradient(node);
    },

    'visit_repeating-linear': function (node: any): any {
      return visitor.visit_gradient(node);
    },

    visit_radial(node: any): any {
      return visitor.visit_gradient(node);
    },

    'visit_repeating-radial': function (node: any): any {
      return visitor.visit_gradient(node);
    },

    visit_gradient(node: any) {
      let orientation = visitor.visit(node.orientation);
      if (orientation) {
        orientation += ', ';
      }

      return (
        node.type + '(' + orientation + visitor.visit(node.colorStops) + ')'
      );
    },

    visit_shape(node: any) {
      let result = node.value;
      const at = visitor.visit(node.at);
      const style = visitor.visit(node.style);

      if (style) {
        result += ' ' + style;
      }

      if (at) {
        result += ' at ' + at;
      }

      return result;
    },

    'visit_default-radial': function (node: any) {
      let result = '';
      const at = visitor.visit(node.at);

      if (at) {
        result += at;
      }
      return result;
    },

    'visit_extent-keyword': function (node: any) {
      let result = node.value;
      const at = visitor.visit(node.at);

      if (at) {
        result += ' at ' + at;
      }

      return result;
    },

    'visit_position-keyword': function (node: any) {
      return node.value;
    },

    visit_position(node: any) {
      return visitor.visit(node.value.x) + ' ' + visitor.visit(node.value.y);
    },

    'visit_%': function (node: any) {
      return node.value + '%';
    },

    visit_em(node: any) {
      return node.value + 'em';
    },

    visit_px(node: any) {
      return node.value + 'px';
    },

    visit_literal(node: any) {
      return visitor.visit_color(node.value.input, node);
    },

    visit_hex(node: any) {
      return visitor.visit_color('#' + node.value.input, node);
    },

    visit_rgb(node: any) {
      return visitor.visit_color(
        'rgb(' + node.value.input.join(', ') + ')',
        node,
      );
    },

    visit_rgba(node: any) {
      return visitor.visit_color(
        'rgba(' + node.value.input.join(', ') + ')',
        node,
      );
    },

    visit_color(resultColor: any, node: any) {
      let result = resultColor;
      const length = visitor.visit(node.length);

      if (length) {
        result += ' ' + length;
      }
      return result;
    },

    visit_angular(node: any) {
      return node.value + 'deg';
    },

    visit_directional(node: any) {
      return 'to ' + node.value;
    },

    visit_array(elements: any[]) {
      let result = '';
      const size = elements.length;

      elements.forEach((element, i) => {
        result += visitor.visit(element);
        if (i < size - 1) {
          result += ', ';
        }
      });

      return result;
    },

    visit(element: any): any {
      if (!element) {
        return '';
      }

      if (element instanceof Array) {
        return visitor.visit_array(element);
      } else if (element.type) {
        const nodeVisitor = visitor['visit_' + element.type];
        if (nodeVisitor) {
          return nodeVisitor(element);
        } else {
          throw Error('Missing visitor visit_' + element.type);
        }
      } else {
        throw Error('Invalid node.');
      }
    },
  };

  return function (root: GradientValue) {
    return visitor.visit(root);
  };
})();
