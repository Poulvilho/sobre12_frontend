export default class FormatUtils {
  static currencyBRL(value: number): string {
    let formattedValue;
    formattedValue = value.toFixed(2).replace('.', ',').replace('-', '');
    for (let i = formattedValue.length - 6; i > 0; i -= 3) {
      formattedValue =
        formattedValue.substring(0, i) + '.' + formattedValue.substring(i);
    }
    formattedValue = 'R$ ' + formattedValue;
    if (value < 0) {
      formattedValue = '-' + formattedValue;
    }
    return formattedValue;
  }

  static dateBR(date: string): string {
    const dateString = date.toString();
    // yyyy-mm-dd -> dd/mm/yyyy
    return (
      dateString.substring(8, 10) +
      '/' +
      dateString.substring(5, 7) +
      '/' +
      dateString.substring(0, 4)
    );
  }
}
