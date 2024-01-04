function lerp(xf, xi, alpha) {
  return (1 - alpha) * xi + alpha * xf;
}

export default lerp;