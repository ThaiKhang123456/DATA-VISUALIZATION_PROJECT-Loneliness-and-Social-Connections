window.addEventListener("load", () => {
    // Select all menu links and convert NodeList to an array
    const links = [...document.querySelectorAll(".menu-link")];
    
    // Add hover event listeners to each link
    links.forEach(item => item.addEventListener("mouseenter", handleHoverLink));
    
    // Create the line-effect div and append it to the body
    const line = document.createElement("div");
    line.className = "line-effect";
    document.body.appendChild(line);

    // Function to handle link hover effect
    function handleHoverLink(event) {
        // Get the bounding rectangle of the hovered link
        const { left, top, width, height } = event.target.getBoundingClientRect();
        console.log({ left, top, width, height });
        
        const offsetBottom = 5;

        // Set the line-effect div's styles based on the hovered link's position
        line.style.width = `${width}px`;
        line.style.left = `${left}px`;
        line.style.top = `${top + height + offsetBottom}px`;
    }
});
