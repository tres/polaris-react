import {Error, ErrorType} from '../types';

interface ErrorOutput {
  error: Error;
}

interface OkOutput {
  value: string;
  error: false;
}

type Output = ErrorOutput | OkOutput;

export const ValidateString = (value: string): Output => {
  const forbiddenCharacters = getForbiddenCharacters(value);

  if (forbiddenCharacters.length > 0) {
    return {
      error: {
        type: ErrorType.ContainsForbiddenCharacters,
        characters: forbiddenCharacters,
      },
    };
  }

  return {value, error: false};
};

const FORBIDDEN_CHARACTERS = ['{{', '}}', '{%', '%}'];

const FORBIDDEN_CHARACTERS_OUTSIDE_COMMENTS = [
  'element(',
  'image(',
  'url(',
  ':',
  ';',
];

const CSS_COMMENT_REGEX = /\/*.*\//;

function getForbiddenCharacters(value: string) {
  const forbiddenCharacters = FORBIDDEN_CHARACTERS.filter((character) =>
    value.includes(character),
  );

  const valueWithoutComments = value.replace(CSS_COMMENT_REGEX, '');

  const forbiddenCharactersOutsideComments = FORBIDDEN_CHARACTERS_OUTSIDE_COMMENTS.filter(
    (character) => valueWithoutComments.includes(character),
  );

  return [...forbiddenCharacters, ...forbiddenCharactersOutsideComments];
}
