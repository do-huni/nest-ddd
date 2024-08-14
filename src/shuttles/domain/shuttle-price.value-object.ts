export class ShuttlePrice {
  constructor(
    public readonly earlyBirdPriceConcert: number,
    public readonly earlyBirdPriceReturn: number,
    public readonly earlyBirdPriceRound: number,
    public readonly regularPriceConcert: number,
    public readonly regularPriceReturn: number,
    public readonly regularPriceRound: number,
  ) {}

  // 가격 검증이나 계산과 같은 비즈니스 로직을 포함할 수 있습니다.
  validatePrices() {
    if (
      this.earlyBirdPriceConcert < 0 ||
      this.earlyBirdPriceReturn < 0 ||
      this.earlyBirdPriceRound < 0 ||
      this.regularPriceConcert < 0 ||
      this.regularPriceReturn < 0 ||
      this.regularPriceRound < 0
    ) {
      throw new Error('Prices cannot be negative');
    }
  }
}
