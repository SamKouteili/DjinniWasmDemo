#!/bin/sh
rm out/MathUtils.js out/MathUtils.wasm
emcc wasm/MathUtils.cpp src/MathUtils.cpp /Users/sam/snap.djinni/support-lib/wasm/djinni_wasm.cpp -o out/MathUtils.js -s MODULARIZE=1 --bind