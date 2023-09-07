#!/usr/bin/env bash
alias snap-djinni="/Users/sam/snap.djinni/src/run-assume-built"
djinni="/Users/sam/snap.djinni"
### Configuration
# Djinni IDL file location
djinni_file="djinni/MathUtils.djinni"

### Script
# get base directory
base_dir=$(cd "$(dirname "$(cd "$(dirname "$0")" && pwd)")" && pwd)
# output directories for generated src
# cpp_out="$base_dir/cpp"
wasm_out="$base_dir/wasm"
src="$base_dir/src"

# clean generated src dirs
rm -rf $wasm_out
rm $src/MathUtils.hpp
# execute the djinni command
snap-djinni \
   --cpp-out $src \
   --wasm-out $wasm_out \
   --wasm-include-prefix "$wasm_out/" \
   --wasm-include-cpp-prefix "$src/" \
   --wasm-base-lib-include-prefix "$djinni/support-lib/wasm/" \
   --idl $djinni_file
