'use client'
import React, { Component, MouseEvent, ChangeEvent, createRef } from 'react';
import simplify from 'simplify-js';

interface Point {
  x: number;
  y: number;
}

interface State {
  paths: Point[][];
  isDrawing: boolean;
  top: number;
  left: number;
  simplify: boolean;
  simplifyHighQuality: boolean;
  simplifyThreshold: number;
}

export default class DrawCanvas extends Component<any, State> {
  canvasRef: React.RefObject<HTMLCanvasElement>; // Declare canvasRef property

  constructor(props: any) {
    super(props);
    this.state = {
      paths: [[]],
      isDrawing: false,
      top: 0,
      left: 0,
      simplify: false,
      simplifyHighQuality: true,
      simplifyThreshold: 3,
    };

    // Create a ref for the canvas element
    this.canvasRef = createRef<HTMLCanvasElement>();
  }

  componentDidMount() {
    // Access the current value of the ref to get the canvas element
    const canvas = this.canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const { left, top } = rect;
      this.setState({ top, left });
    }
  }

  handleMouseDown = () => {
    if (!this.state.isDrawing) {
      this.setState(prevState => ({
        paths: [...prevState.paths, []]
      }));
    }
    this.setState({ isDrawing: true });
  }

  handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.state.isDrawing) {
      const x = e.pageX - this.state.left;
      const y = e.pageY - this.state.top;
      this.setState(prevState => {
        const paths = [...prevState.paths];
        const activePath = paths[paths.length - 1];
        activePath.push({ x, y });
        return { paths };
      });
    }
  }

  handleMouseUp = () => {
    if (this.state.isDrawing) {
      this.setState({ isDrawing: false });
    }
  }

  toggleSimplify = () => {
    this.setState(prevState => ({ simplify: !prevState.simplify }));
  }

  setThreshold = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ simplifyThreshold: Number(e.target.value) });
  }

  render() {
    const paths = this.state.paths.map(_points => {
      let path = '';
      let points = _points.slice();
      if (this.state.simplify) {
        points = simplify(
          points,
          this.state.simplifyThreshold,
          this.state.simplifyHighQuality
        );
      }
      if (points.length > 0) {
        path = `M ${points[0].x} ${points[0].y}`;
        let p1, p2, end;
        for (let i = 1; i < points.length - 2; i += 2) {
          p1 = points[i];
          p2 = points[i + 1];
          end = points[i + 2];
          path += ` C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${end.x} ${end.y}`;
        }
      }
      return path;
    }).filter(p => p !== '');

    return (
      <div>
        <h1>Draw something</h1>
        <label>
          <input
            type="checkbox"
            checked={this.state.simplify}
            onChange={this.toggleSimplify}
          /> Simplify path
        </label>
        <label>
          <input
            style={{color: 'black'}}
            type="number"
            value={this.state.simplifyThreshold}
            onChange={this.setThreshold}
          />
        </label>
        <br />
        <svg
          style={{ border: '1px solid red', cursor: 'crosshair' }}
          width={600}
          height={480}
          ref={this.canvasRef}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        >
          {
            paths.map((path, index) => {
              return (
                <path
                  key={index}
                  stroke="blue"
                  strokeWidth={2}
                  d={path}
                  fill="none"
                />
              );
            })
          }
        </svg>
      </div>
    );
  }
}
