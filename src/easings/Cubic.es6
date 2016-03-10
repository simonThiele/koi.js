export default class CubicEasing {

  constructor(type) {
    switch (type) {
      case 'in':
        this.getValueForProgress = p => p * p * p;
        break;
      case 'out':
        this.getValueForProgress = p => {
          const pt = p - 1;
          return pt * pt * pt + 1;
        };
        break;
      case 'inOut':
        this.getValueForProgress = p => {
          const pt = p * 2;
          if (pt < 1) {
            return 0.5 * pt * pt * pt;
          }

          const ptt = pt - 2;
          return 0.5 * (ptt * ptt * ptt + 2);
        };
        break;
      default:
        this.getValueForProgress = p => p;
    }
  }
}
