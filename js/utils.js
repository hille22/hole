const UTILS = {
  trueModulo(num, mod) {
    return ((num % mod) + mod) % mod; //modulo operator, same as js remainder. but works with negative numbers.
  }
}