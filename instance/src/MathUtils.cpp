// src/MathUtils.cpp
#include "MathUtils.hpp"

class MathUtils_ : public MathUtils {
public:
    double add_fff64(double a, double b) override {
        return a + b;
    }
};

std::shared_ptr<MathUtils> MathUtils::create_math_utils() {
        return std::make_shared<MathUtils_>();
}