import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
    0% {
        background-position: -400px 0;
    }
    100% {
        background-position: 400px 0;
    }
`;

const SkeletonCircle = styled.div`
    width: 40px;
    height: 40px;
    background: #f0f0f0;
    background-image: linear-gradient(to right, #f0f0f0 0%, #e0e0e0 20%, #f0f0f0 40%, #f0f0f0 100%);
    background-repeat: no-repeat;
    background-size: 800px 100%;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    overflow: hidden;
    animation: ${shimmer} 3s infinite linear;
    margin: 0 15px 13px 15px;
`;

export default SkeletonCircle;
