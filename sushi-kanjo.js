'use strict';
const priceInput = document.getElementById('price');
const colorInput = document.getElementById('color');
const addSushiTypeButton = document.getElementById('add-sushi-type');
const sushiCounterArea = document.getElementById('sushi-counter-area');
const totalPriceArea = document.getElementById('total-price-area');

/** @type {SushiType[]} お皿の種類*/
const sushiTypes = [];

class SushiType {
  /**
   * コンストラクタ
   * @param {number} price
   * @param {string} color
   */
  constructor(price, color) {
    this._price = Number(price);
    this._name = String(price) + '円のお皿';
    this._count = 0;
    this._color = color;
  }

  get price() {
    return this._price;
  }

  get name() {
    return this._name;
  }

  get count() {
    return this._count;
  }

  get color() {
    return this._color;
  }

  /**
   * 食べたお皿の数を1増やす
   */
  inclement() {
    this._count++;
  }

  /**
   * 食べたお皿の数を1減らす
   */
  decrement() {
    if(this._count > 0) {
      this._count--;
    }
  }
}

// 追加するボタンが押されたら、SushiTypeクラスの新しいインスタンスを作成する
addSushiTypeButton.onclick = () => {
  const price = priceInput.value;
  const color = colorInput.value;
  const newSushiType = new SushiType(price, color);
  sushiTypes.push(newSushiType);
  displaySushiCounterArea();
}

/**
 * 寿司カウンタを表示する
 */
const displaySushiCounterArea = () => {
  removeAllChildren(sushiCounterArea);
  sushiTypes.forEach((sushiType, index) => {
    /** 寿司カウンタ */
    const sushiCounter = document.createElement('div');
    sushiCounter.setAttribute('class', 'sushiCounter');

    /** お皿の色 */
    const colorDisplay = document.createElement('div');
    colorDisplay.setAttribute('class', 'colorDisplay');
    colorDisplay.style.backgroundColor = sushiType.color;
    sushiCounter.appendChild(colorDisplay);

    /** お皿の種類 */
    const title = document.createElement('h3');
    title.innerText = sushiType.name;
    sushiCounter.appendChild(title);

    /** お皿の枚数 */
    const count = document.createElement('p');
    count.innerText = String(sushiType.count) + '枚';
    sushiCounter.appendChild(count);

    /** お皿の枚数を増やすボタン */
    const inclementButton = document.createElement('button');
    inclementButton.innerText = '+1';
    inclementButton.onclick = () => {
      sushiType.inclement();
      displaySushiCounterArea();
    }
    sushiCounter.appendChild(inclementButton);

    /** お皿の枚数を減らすボタン */
    const decrementButton = document.createElement('button');
    decrementButton.innerText = '-1';
    decrementButton.onclick = () => {
      sushiType.decrement();
      displaySushiCounterArea();
    }
    sushiCounter.appendChild(decrementButton);

    /** お皿の種類の削除ボタン */
    const deleteSushiTypeButton = document.createElement('button');
    deleteSushiTypeButton.innerText = 'このお皿の種類を削除';
    deleteSushiTypeButton.onclick = () => {
      deleteSushiType(index);
      displaySushiCounterArea();
    }
    sushiCounter.appendChild(deleteSushiTypeButton);

    // 寿司カウンタエリアにこの寿司カウンタを追加する
    sushiCounterArea.appendChild(sushiCounter);
  });
  if (sushiTypes.length === 0) {
    const noSushiTypeMessage = document.createElement('p');
    noSushiTypeMessage.innerText = 'まだお皿の種類が登録されていません。'
    sushiCounterArea.appendChild(noSushiTypeMessage);
  }
  updateTotalPrice();
}

/**
 * お皿の種類を削除する
 * @param {number} index
 */
const deleteSushiType = index => {
  sushiTypes.splice(index);
}

/**
 * 合計金額を更新する
 */
const updateTotalPrice = () => {
  let totalPrice = 0;
  sushiTypes.forEach(sushiType => {
    totalPrice += sushiType.price * sushiType.count;
  })
  totalPriceArea.innerText = totalPrice;
}

/**
 * 指定した要素の子要素を全て除去する
 * @param {HTMLElement} element HTML要素
 */
const removeAllChildren = element => {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
