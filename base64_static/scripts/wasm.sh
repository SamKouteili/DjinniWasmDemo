#!/bin/sh
current_directory=$(pwd)
rm out/MathUtils.js out/MathUtils.wasm
emcc wasm/MathUtils.cpp src/MathUtils.cpp /Users/sam/snap.djinni/support-lib/wasm/djinni_wasm.cpp \
    -o out/MathUtils.js \
    -s WASM=1 \
    -s MODULARIZE=1 \
    -s SINGLE_FILE=1 \
    -s WASM_ASYNC_COMPILATION=0 \
    --bind