/** See more here: https://github.com/typekit/webfontloader */
import WebFont from 'webfontloader';

/**
 * Google fonts can be loaded via configuration.
 */
WebFont.load({
  google: {
    families: ['Open Sans'],
  },
});

/**
 * Local fonts can be loaded via stylesheets in the src/fonts folder.
 */
WebFont.load({
  custom: {
    families: ['Arial'],
    urls: [require('fonts/example.css')],
  },
});
