export class Map_t {
  private width: number;
  private height: number;

  public matrix: Array<Array<number>>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.matrix = [];

    this._initialize();
  }

  private _initialize(): void {
    this._initMatrix(this.matrix);

    // this.matrix[2][2] = 1;
    this.matrix[2][3] = 1;
    this.matrix[3][3] = 1;
    this.matrix[4][3] = 1;
    // this.matrix[4][3] = 1;
  }

  private _initMatrix(matrix: Array<Array<number>>): void {
    for (let i = 0; i < this.height; i++) {
      matrix.push([]);
      for (let j = 0; j < this.width; j++) {
        matrix[i].push(0);
      }
    }
  }

  draw(): void {
    console.log("");
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        process.stdout.write(`${this.matrix[i][j]} `);
      }
      console.log();
    }
  }

  update(): void {
    const auxMatrix: Array<Array<number>> = [];
    this._initMatrix(auxMatrix);

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let accum: number = 0;

        // ARRIBA
        if (i > 0) {
          accum += this.matrix[i - 1][j];
        }

        // ARRIBA-DERECHA
        if (i > 0 && j < this.width - 2) {
          accum += this.matrix[i - 1][j + 1];
        }

        // DERECHA
        if (j < this.width - 2) {
          accum += this.matrix[i][j + 1];
        }

        // ABAJO-DERECHA
        if (i < this.height - 2 && j < this.width - 2) {
          accum += this.matrix[i + 1][j + 1];
        }

        // ABAJO
        if (i < this.height - 2) {
          accum += this.matrix[i + 1][j];
        }

        // ABAJO-IZQUIERDA
        if (i < this.height - 2 && j > 0) {
          accum += this.matrix[i + 1][j - 1];
        }

        // IZQUIERDA
        if (j > 0) {
          accum += this.matrix[i][j - 1];
        }

        // ARRIBA- IZQUIERDA
        if (i > 0 && j > 0) {
          accum += this.matrix[i - 1][j - 1];
        }

        let cValue: number = this.matrix[i][j];
        if (cValue == 0 && accum == 3) {
          auxMatrix[i][j] = 1;
        } else if (cValue == 1 && (accum < 2 || accum > 3)) {
          auxMatrix[i][j] = 0;
        } else {
          auxMatrix[i][j] = cValue;
        }
      }
    }

    this.matrix = JSON.parse(JSON.stringify(auxMatrix));
  }
}
