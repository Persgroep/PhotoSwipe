#!/bin/sh
#
# Use this script to place the photoswipe scripts and css into your $DEST directory.
# The paths are for now a little hardcoded ;)

VERSION=3.0.5.1
DEST=/projects/autotrack

cp -prv ./release/$VERSION/code.photoswipe.klass-$VERSION.min.js   $DEST/public/scripts/at/image/photoswipe/impl.js
dos2unix                                                           $DEST/public/scripts/at/image/photoswipe/impl.js
# the massive sed's are for replacing leading tabs to four spaces
#cp -prv ./release/$VERSION/code.photoswipe.klass-$VERSION.js       $DEST/public/scripts-src/at/image/photoswipe/impl.js
cat     ./release/$VERSION/code.photoswipe.klass-$VERSION.js |sed ':a;s/^\([[:space:]]*\)[[:space:]]/\1__@__/;ta'|sed 's/__@__/    /g' | sed 's/[ \t]*$//' > $DEST/public/scripts-src/at/image/photoswipe/impl.js
dos2unix                                                           $DEST/public/scripts-src/at/image/photoswipe/impl.js
cp -prv ./release/$VERSION/photoswipe.css                          $DEST/public/css/photoswipe.css

cp -prv ./release/$VERSION/icons.png                               $DEST/public/gfx/layout/photoswipe/icons.png
optipng -o7                                                        $DEST/public/gfx/layout/photoswipe/icons.png
cp -prv ./release/$VERSION/icons-2x.png                            $DEST/public/gfx/layout/photoswipe/icons-2x.png
optipng -o7                                                        $DEST/public/gfx/layout/photoswipe/icons-2x.png

cp -prv ./release/$VERSION/loader.gif                              $DEST/public/gfx/layout/photoswipe/loader.gif
gifsicle -b --optimize=3                                           $DEST/public/gfx/layout/photoswipe/loader.gif

cp -prv ./release/$VERSION/error.gif                               $DEST/public/gfx/layout/photoswipe/error.gif
gifsicle -b --optimize=3                                           $DEST/public/gfx/layout/photoswipe/error.gif

# We put the graphics in a /gfx/layout/photoswipe path...
sed -i.bak "s/url(/url(\/gfx\/layout\/photoswipe\//g"              $DEST/public/css/photoswipe.css

