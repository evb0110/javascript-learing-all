function minSubArrayLen(arr, num) {
  let minLen = +Infinity;
  for (const chunk of makeFilteredChunkIterator(arr, num)) {
    console.log(chunk);
    minLen = Math.min(minLen, chunk.len);
  }
  if (minLen === Infinity) return 0;
  return minLen;
}

function* makeFilteredChunkIterator(arr, num) {
  for (const chunk of makeChunkIterator(arr, num)) {
    if (chunk.sum >= num) yield chunk;
  }
}

function* makeChunkIterator(arr, num) {
  let left = 0;
  let right = 0;
  let sum = arr[left];
  while (right < arr.length) {
    const len = right - left + 1;
    yield {
      len,
      sum
    };
    if (sum < num) {
      right++;
      sum += arr[right];
    } else {
      sum -= arr[left];
      left++;
    }
  }
}


console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7))