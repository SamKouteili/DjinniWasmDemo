// AUTOGENERATED FILE - DO NOT MODIFY!
// This file was generated by Djinni from MathUtils.djinni

#include "/Users/sam/DjinniWasmDemo/static/wasm/MathUtils.hpp"  // my header

namespace djinni_generated {

em::val MathUtils::cppProxyMethods() {
    static const em::val methods = em::val::array(std::vector<std::string> {
    });
    return methods;
}

double MathUtils::add_fff64(double w_a,double w_b) {
    try {
        auto r = ::MathUtils::add_fff64(::djinni::F64::toCpp(w_a),
                  ::djinni::F64::toCpp(w_b));
        return ::djinni::F64::fromCpp(r);
    }
    catch(const std::exception& e) {
        return ::djinni::ExceptionHandlingTraits<::djinni::F64>::handleNativeException(e);
    }
}

EMSCRIPTEN_BINDINGS(_MathUtils) {
    em::class_<::MathUtils>("MathUtils")
        .smart_ptr<std::shared_ptr<::MathUtils>>("MathUtils")
        .function("nativeDestroy", &MathUtils::nativeDestroy)
        .class_function("addFff64", MathUtils::add_fff64)
        ;
}

} // namespace djinni_generated
