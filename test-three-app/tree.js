/*
* Tree to represent 2D space
*/
export default class QuadTree {
  #regionLength;
  // starting x and y coordinates with range of width and height
  constructor(startX, startY, length, regionLength) {
    this.startX = startX;
    this.startY = startY;
    this.length = length;
    this.#regionLength = regionLength ?? 2;
    this.numRegions = (length / this.#regionLength) ** 2;
    this.root = new QuadTreeNode();
  }

  add(x, y, obj) {
    const quadrants = this.#calculateQuadrants(x, y);
    let cur = this.root;
    for (const quadrant of quadrants) {
      switch (quadrant) {
        case 1:
          if (cur.topleft === null) cur.topleft = new QuadTreeNode();
          cur = cur.topleft;
          break;
        case 2:
          if (cur.topright === null) cur.topright = new QuadTreeNode();
          cur = cur.topright;
          break;
        case 3:
          if (cur.bottomleft === null) cur.bottomleft = new QuadTreeNode();
          cur = cur.bottomleft;
          break;
        case 4:
          if (cur.bottomright === null) cur.bottomright = new QuadTreeNode();
          cur = cur.bottomright;
          break;
      }
    }
    // console.log(x, y, quadrants);
    // in the desired quadrant
    if (cur.values === null) {
      cur.values = [];
    }
    // console.log('done');
    cur.values.push(obj);
  }

  addIfAbsent(x, y, obj) {

  }

  getParticles(x, y) {
    const quadrants = this.#calculateQuadrants(x, y);
    let cur = this.root;
    for (const quadrant of quadrants) {
      switch (quadrant) {
        case 1:
          cur = cur.topleft;
          break;
        case 2:
          cur = cur.topright;
          break;
        case 3:
          cur = cur.bottomleft;
          break;
        case 4:
          cur = cur.bottomright;
          break;
      }
      if (cur === null) return [];
    }
    return cur.values;
  }

  getParticlesInRange(x, y, range) {

  }

  // returns 1,2,3,4 depending on quadrant
  #calculateQuadrant(x, y, startX, startY, length) {
    const midX = (2 * startX + length) / 2;
    const midY = (2 * startY + length) / 2;
    if (x < midX) {
      if (y < midY) {
        return 1;
      } else {
        return 2;
      }
    } else {
      if (y < midY) {
        return 3;
      } else {
        return 4;
      }
    }
  }

  // return list of quadrants to get to x y
  #calculateQuadrants(x, y) {
    // console.log(x, y);
    let curLength = this.length;
    // console.log(curLength); 512
    // transform x and y to "normal" starting on 0
    x -= this.startX;
    y -= this.startY;
    // console.log(x, y);
    let left = 0;
    let bottom = 0;
    const quadrants = [];
    while (curLength > this.#regionLength) {
      curLength /= 2;
      if (x < left + curLength) {
        if (y < bottom + curLength) {
          quadrants.push(3);
        } else {
          bottom += curLength;
          quadrants.push(1);
        }
      } else {
        left += curLength;
        if (y < bottom + curLength) {
          quadrants.push(4);
        } else {
          bottom += curLength;
          quadrants.push(2);
        }
      }
    }
    // console.log(x, y, quadrants);
    return quadrants;
  }

  calc(x, y) {
    return this.#calculateQuadrants(x, y);
  }

  getRegion(index) {
    
  }

  getRegions() {
    const res = [];
    this.#getRegionsHelper(res, this.root);
  }

  #getRegionsHelper(res, cur) {
    if (cur.values) {
      
    }
  }
}

class QuadTreeNode {
  constructor(values) {
    this.values = values ?? null;
    this.topleft = null;
    this.topright = null;
    this.bottomleft = null;
    this.bottomright = null;
  }
}

function test() {
  const tree = new QuadTree(-256, -256, 512);
  console.log(tree.calc(-255, -255));
  console.log(tree.calc(-128, 64));
  console.log(tree.calc(0, 0));
}

// test();