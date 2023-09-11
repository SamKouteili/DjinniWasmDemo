# DjinniWasmDemo

With the new [Snapchat/Djinni](https://github.com/Snapchat/djinni) fork, we can now directly generate relevant emscripten binding files for C++ classes. In this directory, we showcase how to do
this with two versions of a simple `MathUtils` class constructed in C++, with one notable function `add_fff64`. In the [static](https://github.com/SamKouteili/DjinniWasmDemo/tree/main/static)
directory, `add_fff64` is defined as a **static** method, which thus does not require any instantiation of `MathUtils`. In such a case, there is no need to define a class instantation of `MathUtils`,
and `add_fff64` can be directly specified. In the [instance](https://github.com/SamKouteili/DjinniWasmDemo/tree/main/instance) directory, `add_fff64` is not static, and thus necessitates a class
instance for `MathUtils` to be defined. In both directories, only src/MathUtils.cpp is not generated, as well as `index.html` for demonstration of function usage. In order to recreate the generated
files, simply first run scripts/djinni.sh and then scripts/wasm.sh, which highlight the commands necessary to generate the files we need.
