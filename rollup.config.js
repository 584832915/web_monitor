import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import  json from '@rollup/plugin-json'

export default {
    input:"src/index.ts",
    output:{
        file:'dist/monitor.min.js',
        // format: "cjs",// 模块输出格式：es、cjs、amd、umd、iife、system
        name: 'MonitorJS',
    },
    plugins:[ 
        babel({
            exclude:"node_modules/**"
        }),
        json(),
        nodeResolve(),//可以加载node_modules里有的模块
        commonjs(),//支持commonjs语法
        typescript(),
        terser(),//压缩
    ]
    
}