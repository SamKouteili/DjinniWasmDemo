// src/MathUtils.cpp
#include <emscripten/bind.h>

using namespace emscripten;

class MathUtils {
public:

 MathUtils(int x) : x(x) {}

static double add_fff64(double a, double b) {
        return a + b;
}

private :
    int x;
};

EMSCRIPTEN_BINDINGS(MathUtils) {
  class_<MathUtils>("MathUtils")
    .constructor<int>()
    .class_function("addFff64", &MathUtils::add_fff64)
    ;
}