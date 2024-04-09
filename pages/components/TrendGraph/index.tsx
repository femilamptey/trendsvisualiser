import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TrendNode extends d3.SimulationNodeDatum {
    location: string; // Full country name
    geo: string; // Country code (2 or 3-letter code)
    extracted_value: number;
}

const TrendGraph: React.FC<{ data: TrendNode[] }> = ({ data }) => {
    const d3Container = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const padding = 20;

        if (data && d3Container.current) {
            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();

            const width = 1300;
            const height = 600;

            svg.attr("width", width).attr("height", height);

            const size = d3.scaleSqrt()
                .domain([1, d3.max(data, d => d.extracted_value) ?? 1])
                .range([10, (width / 10) - padding]);

            const simulation = d3.forceSimulation<TrendNode>(data)
                .force("charge", d3.forceManyBody().strength(5))
                .force("x", d3.forceX(width / 2).strength(0.1))
                .force("y", d3.forceY(height / 2).strength(0.1))
                .force("collision", d3.forceCollide<TrendNode>(d => size(d.extracted_value) + 2));
            

            // Safely access parentNode for tooltip
            const parentDiv = d3.select(d3Container.current.parentNode as HTMLElement);

            const tooltip = parentDiv.append("div")
                .attr("class", "tooltip") // Use a class to style your tooltip
                .style("position", "absolute")
                .style("visibility", "hidden")
                .style("padding", "10px")
                .style("background", "rgba(0, 255, 0, 0.8)")
                .style("border", "1px solid #ddd")
                .style("border-radius", "5px")
                .style("text-align", "center")
                .style("pointer-events", "none");

            const nodes = svg.append("g")
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", d => size(d.extracted_value))
                .attr("fill", "green")
                .on("mouseover", function(event, d) {
                    tooltip.html(d.location)
                        .style("visibility", "visible");
                })
                .on("mousemove", function(event) {
                    tooltip.style("top", (event.pageY - 10) + "px")
                           .style("left",(event.pageX + 10) + "px");
                })
                .on("mouseout", function() {
                    tooltip.style("visibility", "hidden");
                });

            const labels = svg.append("g")
                .selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(d => d.geo) // Use country code here
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "central")
                .style("fill", "white")
                .style("font-size", d => Math.min(2 * size(d.extracted_value), 18))
                .style("pointer-events", "none");

            simulation.on("tick", () => {
                nodes.attr("cx", d => Math.max(padding, Math.min(width - padding, d.x ?? 0)))
                    .attr("cy", d => Math.max(padding, Math.min(height - padding, d.y ?? 0)));

                labels.attr("x", d => Math.max(padding, Math.min(width - padding, d.x ?? 0)))
                    .attr("y", d => Math.max(padding, Math.min(height - padding, d.y ?? 0)));
            });

            return () => {
                simulation.stop();
                tooltip.remove(); // Clean up tooltip when component unmounts
            };
        }
    }, [data]);

    return (
        <svg ref={d3Container} />
    );
};

export default TrendGraph;
