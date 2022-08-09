import { categories } from "../constants/Categories";

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
  static getIcon(pCategory: string): string|undefined {
    let index = 0;
    let categoryIndex = 5;
    for(let category of categories){
      if(category.value == pCategory.toString()){
        categoryIndex = index
      }
      index++;
    }
    // let categoryIndex = categories.findIndex(
    //   (category) => { 
    //     category.value == budget.category.toString()},
    // )
    return categories[categoryIndex].icon
  }
}
