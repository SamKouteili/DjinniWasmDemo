// AUTOGENERATED FILE - DO NOT MODIFY!
// This file was generated by Djinni from MathUtils.djinni

#include "/Users/sam/DjinniWasmDemo/instance/wasm/MathUtils.hpp"  // my header

namespace djinni_generated {

em::val MathUtils::cppProxyMethods() {
    static const em::val methods = em::val::array(std::vector<std::string> {
        "addFff64",
    });
    return methods;
}

double MathUtils::add_fff64(const CppType& self, double w_a,double w_b) {
    try {
        auto r = self->add_fff64(::djinni::F64::toCpp(w_a),
                  ::djinni::F64::toCpp(w_b));
        return ::djinni::F64::fromCpp(r);
    }
    catch(const std::exception& e) {
        return ::djinni::ExceptionHandlingTraits<::djinni::F64>::handleNativeException(e);
    }
}
em::val MathUtils::create_math_utils() {
    try {
        auto r = ::MathUtils::create_math_utils();
        return ::djinni_generated::MathUtils::fromCpp(r);
    }
    catch(const std::exception& e) {
        return ::djinni::ExceptionHandlingTraits<::djinni_generated::MathUtils>::handleNativeException(e);
    }
}

EMSCRIPTEN_BINDINGS(_MathUtils) {
    em::class_<::MathUtils>("MathUtils")
        .smart_ptr<std::shared_ptr<::MathUtils>>("MathUtils")
        .function("nativeDestroy", &MathUtils::nativeDestroy)
        .function("addFff64", MathUtils::add_fff64)
        .class_function("createMathUtils", MathUtils::create_math_utils)
        ;
}

} // namespace djinni_generated
