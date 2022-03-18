#!/bin/bash

# BUILD FOR VITE USERS
# TODO: build for "normal" users (see solid-blocks for inspiration)
# Note that in that way, people will have to import css manually and they
# won't be able to import from a path (I think?)

set -e
shopt -s globstar dotglob

cd "$(dirname "$0")"

rm -rf dist
rm *.tsbuildinfo
mkdir dist

# build jsx, d.ts, and mappings into dist
echo "---COMPILING TYPESCRIPT---"
pnpx tsc -b .

copy_sass() {
  for sassfile in components/**/*.scss; do
    cssfile="dist/${sassfile#*/}"
    mkdir -p "$(dirname "$cssfile")"
    cp "$sassfile" "$cssfile"
  done
}

# sass every scss file in components to a css file in dist
compile_sass() {
  echo "---COMPILING SASS---"
  for sassfile in components/**/*.scss; do
    withoutcomp="${sassfile#*/}"
    withoutext="${withoutcomp%.*}"
    cssfile="dist/$withoutext.css"
    mkdir -p "$(dirname "$cssfile")"

    # note that this requires the .npmrc to contain:
    #   public-hoist-pattern[]=@material/*
    pnpx sass -I 'node_modules' "$sassfile" "$cssfile"
  done

  # replace references to .scss files to .css files
  echo "---REPLACING SCSS REFERENCES---"
  for jsfile in dist/**/*.jsx dist/**/*.js; do
    sed -i 's/^import "\(.*\).scss"/import "\1.css"/g' "$jsfile"
  done
}

# Pick one:
compile_sass
#copy_sass

# Now copy some more files to publish the dist folder
cp LICENSE README.md package.json dist/
