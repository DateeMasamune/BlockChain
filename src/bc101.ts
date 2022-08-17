import * as crypto from 'crypto'

class Block {
  readonly hash: string //хэш этого блока

  constructor(
    readonly index: number, //последовательный номер этого блока
    readonly previousHash: string, //хеш предыдущего блока
    readonly timestamp: number, //время создания
    readonly data: string //данные приложения
  ) {
    this.hash = this.calculateHash() //вычислить хэш при его создании
  }

  private calculateHash(): string {
    const data = this.index + this.previousHash + this.timestamp + this.data

    return crypto
      .createHash('sha256') //создается экземпляр объекта хэш для генерации ша-256 хеша
      .update(data) //вычисляет и обновляет хеш значение внутри объекта хэш
      .digest('hex') //преобразует хеш значение в 16ю строку
  }
}

class BlockChain {
  private readonly chain: Block[] = [] //блокчейн будет храниться здесь

  private get latestBlock(): Block { // геттер для получения ссылки на последний добавленный блок
    return this.chain[this.chain.length - 1]
  }

  constructor() {
    this.chain.push(
      new Block(0, '0', Date.now(), 'Genesis block') //создает первичный блок и добавляет его в цепочку
    )
  }

  addBlock(data: string): void { //создает новый экземпляр блок и заполняет его свойства
    const block = new Block(
      this.latestBlock.index + 1,
      this.latestBlock.hash,
      Date.now(),
      data
    )

    this.chain.push(block) //добавляет блока в массив
  }
}

console.log('Creating the blockchain with the genesis block...');
const blockChain = new BlockChain()

console.log('Mining block #1...');
blockChain.addBlock('First block')

console.log('Mining block #2...');
blockChain.addBlock('Second block')

console.log(JSON.stringify(blockChain, null, 2));


