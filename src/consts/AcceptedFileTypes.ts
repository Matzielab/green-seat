export const ACCEPTED_TEXT_TYPES = [
  "text/plain",
  "text/html",
  "text/css",
  "text/javascript",
  "application/x-javascript",
  "text/x-typescript",
  "application/x-typescript",
  "text/csv",
  "text/markdown",
  "text/x-python",
  "application/x-python-code",
  "application/json",
  "text/xml",
  "application/rtf",
  "text/rtf",
  "application/pdf",
];

export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg"];

export const ACCEPTED_VIDEO_TYPES = [
  "video/x-flv",
  "video/mov",
  "video/mpeg",
  "video/mpegps",
  "video/mpg",
  "video/mp4",
  "video/webm",
  "video/wmv",
  "video/3gpp",
];

export const ACCEPTED_AUDIO_TYPES = [
  "audio/aac",
  "audio/flac",
  "audio/mp3",
  "audio/m4a",
  "audio/mpeg",
  "audio/mpga",
  "audio/mp4",
  "audio/opus",
  "audio/pcm",
  "audio/wav",
  "audio/webm",
];

export const ALL_ACCEPTED_TYPES = [
  ...ACCEPTED_TEXT_TYPES,
  ...ACCEPTED_IMAGE_TYPES,
  ...ACCEPTED_VIDEO_TYPES,
  ...ACCEPTED_AUDIO_TYPES,
];
