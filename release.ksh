#!/bin/ksh
#
# Use this script to place the photoswipe scripts and css into your /projects/autotrack directory.
# The paths are for now a little hardcoded ;)

cp -prv ./release/3.0.5.1/code.photoswipe-3.0.5.1.min.js       /projects/autotrack/public/scripts/at/image/photoswipe/impl.js
cp -prv ./release/3.0.5.1/code.photoswipe-3.0.5.1.js           /projects/autotrack/public/scripts-src/at/image/photoswipe/impl.js
cp -prv ./release/3.0.5.1/photoswipe.css                       /projects/autotrack/public/css/photoswipe.css
cp -prv ./release/3.0.5.1/icons.png                            /projects/autotrack/public/gfx/layout/photoswipe/icons.png
optipng -o7                                                    /projects/autotrack/public/gfx/layout/photoswipe/icons.png

cp -prv ./release/3.0.5.1/loader.gif                           /projects/autotrack/public/gfx/layout/photoswipe/loader.gif
ls -althr                                                      /projects/autotrack/public/gfx/layout/photoswipe/loader.gif
gifsicle -b --optimize=3                                       /projects/autotrack/public/gfx/layout/photoswipe/loader.gif
ls -althr                                                      /projects/autotrack/public/gfx/layout/photoswipe/loader.gif

cp -prv ./release/3.0.5.1/error.gif                            /projects/autotrack/public/gfx/layout/photoswipe/error.gif
ls -althr                                                      /projects/autotrack/public/gfx/layout/photoswipe/error.gif
gifsicle -b --optimize=3                                       /projects/autotrack/public/gfx/layout/photoswipe/error.gif
ls -althr                                                      /projects/autotrack/public/gfx/layout/photoswipe/error.gif

# We put the graphics in a /gfx/layout/photoswipe path...
sed -i.bak "s/url(/url(\/gfx\/layout\/photoswipe\//g"          /projects/autotrack/public/css/photoswipe.css

