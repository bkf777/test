import { useEffect, useRef } from "react";
import * as echarts from 'echarts/core';
import {useControllableValue } from 'ahooks';    
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';


type IProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any;
}

export default function Chart(props: IProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [options] = useControllableValue(props.options);

    echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TitleComponent, TooltipComponent, BarChart]);
    useEffect(() => {
       /** @type EChartsOption */
        echarts.init(ref.current!).setOption(options ?? {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {
                trigger: 'item',
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                type: 'category',
                boundaryGap: false,
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '销量',
                type: 'line',
                smooth: true,
                data: [5, 20, 36, 10, 10, 20],
                areaStyle: {
                    opacity: 0.5,
                    /* 
                    关于new echarts.graphic.LinearGradient
                    前4个参数分别是渐变的起始点和结束点的坐标，最后一个参数是渐变的颜色
                     */
                    color:new echarts.graphic.LinearGradient(
                        /* 渐变的起始点和结束点的坐标，
                        值的范围是 0 到 1，
                        表示相对于坐标系的位置，
                        类似于百分比，
                        比如 0.5 表示坐标系的中心，
                        1 表示坐标系的最右边，0 表示坐标系的最左边。
                        
                        */
                        0, 0, 0, 1,
                        [{
                        offset: 0,
                        color: 'rgba(154, 84, 157, 1)'
                    }, {
                        offset: 1,
                        color: 'rgba(255 , 255, 255)'
                    }], false),
                },
            }],
            
        });
    }, [options]);


  return (
    <div ref={ref} style={{
        height: 400
    }}/>
  )
}
