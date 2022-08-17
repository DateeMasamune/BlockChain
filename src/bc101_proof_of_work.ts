import * as crypto from 'crypto'

class Block {
  readonly nonce: number
  readonly hash: string

  constructor(
    readonly index: number,
    readonly previousHash: string,
    readonly timestamp: number,
    readonly data: string
  ) {
    const { nonce, hash } = this.mine() //вычисляем nonce , hash
    this.nonce = nonce
    this.hash = hash
  }

  private calculateHash(nonce: number): string {
    const data = this.index + this.previousHash + this.timestamp + this.data + nonce //за счет постоянного изменения nonce будет генерироваться новый хэш
    return crypto.createHash('sha256').update(data).digest('hex')
  }

  private mine(): { nonce: number, hash: string } {
    let hash: string
    let nonce = 0

    do {
      hash = this.calculateHash(++nonce) //использует полный перебор для добычи данных
    } while (hash.startsWith('00000') === false)

    return { nonce, hash }
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