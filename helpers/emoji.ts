import emojis from '@/data/emojis';

export function emojiSection() {
  return Object.keys(emojis).map((key: string) => ({
    title: key,
    data: [
      {
        list: emojis[key],
      },
    ],
  }));
}
