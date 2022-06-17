import { describe, expect, it } from 'vitest';

import { emojiAvatarForAddress } from './emojiAvatarForAddress';

describe('emojiAvatarForAddress', () => {
  it('supports valid addresses', () => {
    expect(emojiAvatarForAddress('0xDE7F309DE0F69C49E7C065BB4AE6DFFE0F5E32F4'))
      .toMatchInlineSnapshot(`
      {
        "color": "#1dcb6a",
        "emoji": "🐭",
      }
    `);

    expect(emojiAvatarForAddress('0xDEc7420D9b155E35a458236215fE8C617d6499F8'))
      .toMatchInlineSnapshot(`
      {
        "color": "#ff9aff",
        "emoji": "🐲",
      }
    `);

    expect(emojiAvatarForAddress('0xad7fFe8769843B4C6126C81D06555cE501ed85Df'))
      .toMatchInlineSnapshot(`
      {
        "color": "#ff66cc",
        "emoji": "🤑",
      }
    `);

    expect(emojiAvatarForAddress('0x5c8b0C466680158a82fdd9dcCDE04901D662B5c3'))
      .toMatchInlineSnapshot(`
      {
        "color": "#1dcb6a",
        "emoji": "🦄",
      }
    `);

    expect(emojiAvatarForAddress('0x078EF6C1edf4612068eA385cb4a48F998491D51e'))
      .toMatchInlineSnapshot(`
      {
        "color": "#9eaeff",
        "emoji": "🫐",
      }
    `);
  });
});
