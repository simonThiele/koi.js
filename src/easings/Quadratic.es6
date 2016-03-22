export default class QuadraticEasing {

  constructor(type) {
    switch (type) {
      case 'in':
        this.getValueForProgress = p => p * p;
        break;
      case 'out':
        this.getValueForProgress = p => p * (2 - p);
        break;
      case 'inOut':
        this.getValueForProgress = p => {
          const pt = p * 2;
          if (pt < 1) {
            return 0.5 * pt * pt;
          }

          const ptt = pt - 1;
          return -0.5 * (ptt * (ptt - 2) - 1);
        };
        break;
      default:
        this.getValueForProgress = p => p;
    }
  }
}
