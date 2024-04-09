import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TrendNode extends d3.SimulationNodeDatum {
    location: string;
    extracted_value: number;
}

const TrendGraph: React.FC<{ data: TrendNode[] }> = ({ data }) => {
    const d3Container = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (data && d3Container.current) {
            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove(); // Clear SVG content before redrawing

            const width = 1300;
            const height = 600;

            svg.attr("width", width).attr("height", height);

            const size = d3.scaleSqrt()
                .domain([1, d3.max(data, d => d.extracted_value)])
                .range([10, 100]);

            const simulation = d3.forceSimulation<TrendNode>(data)
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force("collision", d3.forceCollide<TrendNode>(d => size(d.extracted_value)));

            const nodes = svg.append("g")
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", d => size(d.extracted_value))
                .attr("fill", "steelblue");

            const labels = svg.append("g")
                .selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(d => d.location)
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "central")
                .style("fill", "white")
                .style("font-size", d => Math.min(2 * size(d.extracted_value), 18))
                .style("pointer-events", "none");

            simulation.on("tick", () => {
                nodes.attr("cx", d => d.x ?? 0)
                    .attr("cy", d => d.y ?? 0);

                labels.attr("x", d => d.x ?? 0)
                    .attr("y", d => d.y ?? 0);
            });

            return () => {
                simulation.stop();
            };
        }
    }, [data]);

    return (
        <svg ref={d3Container} />
    );
};

export default TrendGraph;