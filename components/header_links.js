
    class LinkList extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
          <style>
            ul { list-style: none; padding: 0; }
            li { margin: 5px 0; }
            a { text-decoration: none; color: blue; }
          </style>
          <ul>
        <li><a href="cirr-vit.html">Cirriculum Vitae</a></li>
        <li><a href="impressum.html">Galery</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="todo.html">To do List</a></li>
        <li><a href="paper.html">Paper Review</a></li>

      </ul>
        `;
        }
    }

    customElements.define('HeaderLinks', LinkList);
