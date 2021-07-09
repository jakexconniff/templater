const exampleString = 'Hello my name is {{USER_NAME}} and I like {{USER_LIKES}}.';

const exampleDBContents = [
  {
    templateString: '{{USER_NAME}}',
    swap: 'Jake Conniff'
  },
  {
    templateString: '{{USER_LIKES}}',
    swap: 'cheese'
  }
];

const decodeTemplate = ({ exampleString, exampleDBContents }) => {
  console.log(`Starting to decode the following template:`);
  console.log(exampleString);
  // First we need to break the string into pieces.
  const brokenString = exampleString.split(/({{[^}]*}})/g);
  // Then we map over the pieces.
  const fixedString = brokenString.map((stringy, outerIndex) => {
    // Then for each piece, we need to loop over both the split strings and the potential targets.
    // This is what loops over the exampleDBContents and compares it to the pieces of the original string (broken down) and finds the match.
    const stringyFinder = exampleDBContents.map((dbContents, innerIndex) => {
      if (dbContents.templateString == stringy) {
        return dbContents.swap;
      }
    });
    // Before we do this, stringyFinder returned null for each instance that did not match. We need to clean that and keep just the matched stuff.
    const filteredStringyFinder = stringyFinder.filter((a) => { return !!a });
    // Choose whether to return the piece from the original string (ie. My name is) or the swapped template string (ie. Jake or cheese.)
    if (filteredStringyFinder && filteredStringyFinder.length > 0) {
      return filteredStringyFinder;
    } else {
      return stringy;
    }
  });
  // Join them back up so they are 1 string again.
  return fixedString.join('');
}

const decodedTemplate = decodeTemplate({ exampleString, exampleDBContents });
console.log(`Your template is decoded. Read it below!`);
console.log(`----`);
console.log(decodedTemplate);