// src/MathUtils.cpp
#include "MathUtils.hpp"

// double MathUtils::add_fff64(double a, double b) {
//         return a + b;
// }

class MathUtils_ : public MathUtils {
public:
    double add_fff64(double a, double b) override {
        return a + b;
    }
};
