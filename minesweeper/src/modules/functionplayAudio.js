function playAudioClick(vol) {
  const audio = new Audio();
  audio.src = '../src/sounce/click.mp3';
  if (vol === false) {
    audio.volume = 0;
  } else {
    audio.volume = 1;
  }
  audio.play();
}

function playAudioWin(vol) {
  const audio = new Audio();
  audio.src = '../src/sounce/win.mp3';
  if (vol === false) {
    audio.volume = 0;
  } else {
    audio.volume = 1;
  }
  audio.play();
}

function playAudioLose(vol) {
  const audio = new Audio();
  audio.src = '../src/sounce/lose.mp3';
  if (vol === false) {
    audio.volume = 0;
  } else {
    audio.volume = 1;
  }
  audio.play();
}

function playAudioFlag(vol) {
  const audio = new Audio();
  audio.src = '../src/sounce/flag.mp3';
  if (vol === false) {
    audio.volume = 0;
  } else {
    audio.volume = 1;
  }
  audio.play();
}

export {
  playAudioClick, playAudioWin, playAudioLose, playAudioFlag,
};
