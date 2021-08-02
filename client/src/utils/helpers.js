import React from 'react';

export const combineReducers = (slices) => (state, action) =>
  Object.keys(slices).reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action),
    }),
    state
  );

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const lowercaseAndCapitalize = (str) => capitalize(str.toLowerCase());

export const randInt = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));

export const randFloat = (min, max) => Math.random() * (max - min) + min;

export const getKeyByValue = (obj, value) =>
  Object.keys(obj).find((key) => obj[key] === value);

export const nameToUsername = (name) =>
  name.replace(/[^0-9a-z]/gi, '').toLowerCase() +
  '-' +
  Math.random().toString(36).slice(2);

export const mean = (arr) => arr.reduce((a, b) => a + b) / arr.length;

export const stdev = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};

export const scaleData = (arr, min = 0, max = 1) => {
  let fmax = Math.max.apply(null, arr);
  let fmin = Math.min.apply(null, arr);
  return arr.map((fx) => (max - min) * ((fx - fmin) / (fmax - fmin)) + min);
};

export const minMaxScale = (val, max, min) => (val - min) / (max - min);

export const getFileNameFromPath = (str) =>
  str.split('\\').pop().split('/').pop();

export const linRescale = (value, x1, y1, x2, y2) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export const range = (start, end, step = 1) => {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill()
    .map((_, idx) => start + idx * step);
};

export const randomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const randomDateAfterDate = (start, days) =>
  new Date(start.getTime() + Math.random() * days * 24 * 60 * 60 * 1000);

export const getRandomItemFromArray = (items) =>
  items[Math.floor(Math.random() * items.length)];

export const shuffle = (array) => {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const checkVisible = (domElm) => {
  var rect = domElm.getBoundingClientRect();
  var viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

export const docReady = (fn) => {
  if (document.readyState != 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState != 'loading') fn();
    });
  }
};

export const countLines = (el) => {
  var divHeight = el.offsetHeight;
  var lineHeight = parseInt(
    window.getComputedStyle(el, null).getPropertyValue('line-height')
  );
  var lines = divHeight / lineHeight;
  return lines;
};

export const renderClientSideOnly = (page) => {
  if (typeof window !== 'undefined') {
    return page;
  }
  return () => {
    return <></>;
  };
};

export const splitNParts = (number, parts, min, ceil = false) => {
  const randombit = number - min * parts;
  const out = [];

  for (let i = 0; i < parts; i++) {
    out.push(Math.random());
  }

  const mult =
    randombit /
    out.reduce(function (a, b) {
      return a + b;
    });

  let res = out.map(function (el) {
    return el * mult + min;
  });

  if (ceil) res = res.map((val) => Math.min(100, Math.ceil(val)));

  return res;
};

export const getRandomItemFromObject = (obj) => {
  const keys = Object.keys(obj);
  const randKey = keys[(keys.length * Math.random()) << 0];
  return obj[randKey];
};

export const randomUnique = (range, count) => {
  let nums = new Set();
  while (nums.size < count) {
    nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
  }
  return [...nums];
};

export const defaultErrorMessage = () => 'Sorry, something went wrong.';
export const defaultSuccessMessage = () => 'Sucess';

export const getDaysArray = (year, month) => {
  const monthIndex = month - 1;
  const names = Object.freeze([
    'sun',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
  ]);
  const date = new Date(year, monthIndex, 1);
  const result = [];
  while (date.getMonth() == monthIndex) {
    result.push(`${date.getDate()}-${names[date.getDay()]}`);
    date.setDate(date.getDate() + 1);
  }
  return result;
};

export const groupByN = (n, data) => {
  let result = [];
  for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
  return result;
};
