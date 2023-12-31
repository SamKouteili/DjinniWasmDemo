#!/usr/bin/env bash
alias snap-djinni="/Users/sam/snap.djinni/src/run-assume-built"
djinni="/Users/sam/snap.djinni"
### Configuration
# Djinni IDL file location
djinni_file="djinni/MathUtils.djinni"
# C++ namespace for generated src
# namespace="bl"

### Script
# get base directory
base_dir=$(cd "$(dirname "$(cd "$(dirname "$0")" && pwd)")" && pwd)
# output directories for generated src
# cpp_out="$base_dir/cpp"
java_out="$base_dir/java"
jni_out="$base_dir/jni"
wasm_out="$base_dir/wasm"
src="$base_dir/src"
ts_out="$base_dir/ts"
# clean generated src dirs
rm -rf $wasm_out
rm $src/MathUtils.hpp
rm -rf $ts_out
# execute the djinni command
snap-djinni \
   --cpp-out $src \
   --ts-out $ts_out \
   --wasm-out $wasm_out \
   --wasm-include-prefix "$wasm_out/" \
   --wasm-include-cpp-prefix "$src/" \
   --wasm-base-lib-include-prefix "$djinni/support-lib/wasm/" \
   --idl $djinni_file