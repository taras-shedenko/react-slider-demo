import React, { useRef } from 'react';
import styled from 'styled-components';

const getPosPct = (posPx: number, maxWidth: number): number => 100 * posPx / maxWidth;

const Bar = styled.div`
    position: relative;
    height: 12px;
    margin: 4px 24%;
    background-color: lightgrey;
    border-radius: 4px;
`;

const Runner = styled.div`
    position: absolute;
    top: -4px;
    height: 20px;
    width: 8px;
    background-color: blue;
    opacity: .5;
    border-radius: 2px;
    cursor: pointer;
`;

const Slider = () => {
    const runnerWidth = 8;
    let sliderLeft: number;
    let sliderWidth: number;

    const barRef = useRef<HTMLDivElement>(null);
    const runnerRef = useRef<HTMLDivElement>(null);

    const handleRunnerMouseDown = () => {
        sliderLeft = barRef.current!.getBoundingClientRect().left;
        sliderWidth = barRef.current!.getBoundingClientRect().width;

        document.addEventListener('mousemove', hanldeMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    const hanldeMouseMove = ({ clientX }: MouseEvent) => {
        let newRunnerPos = clientX - sliderLeft;

        if (newRunnerPos < 0) newRunnerPos = 0;
        if (newRunnerPos > sliderWidth) newRunnerPos = sliderWidth;

        runnerRef.current!.style.left = `calc(${getPosPct(newRunnerPos, sliderWidth)}% - ${runnerWidth/2}px)`;
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', hanldeMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <Bar ref={barRef} className='bar'>
            <Runner
                style={{ left: -runnerWidth/2 }}
                ref={runnerRef}
                onMouseDown={handleRunnerMouseDown}
            />
        </Bar>
    );
}

export default Slider;
