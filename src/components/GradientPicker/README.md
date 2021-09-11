---
name: Gradient picker
category: Forms
keywords:
  - GradientPicker
  - HuePicker
  - AlphaPicker
  - Slidable
  - Choose color
  - Select color
  - Pick color
  - color selector with transparent value
  - colorpicker with transparent value
  - alpha value picker
  - alpha value selector
---

# Gradient picker

The color picker is used to let merchants select a gradient visually. For
example, merchants use the gradient picker to customize a background gradient of the
product templates for their shop.

---

## Best practices

- Probably don't use these. Gradients are the worst.

---

## Examples

### Default gradient picker

Use when merchants need to select a color to make the selection a visual
task rather than a technical one.

```jsx
function GradientPickerExample() {
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  return <GradientPicker onChange={setColor} color={color} />;
}
```
