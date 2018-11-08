import React from 'react';

import Typography from '@typography';

export default class TypographyExample extends React.Component<{}, {}> {
    render() {
        return (
            <Typography>
                <h1>Heading 1</h1>
                <p>This is a paragraph. <em>This text is cursive</em>, <strong>but this text is bold</strong>. <a href="#">This is a link</a> voluptatum delectus, similique et dolorem dolorum natus eaque debitis dolores, est dolore maxime! Quidem maiores nihil nobis quia unde provident.</p>
                <h2>Heading 2</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti fuga nostrum soluta totam sit magnam esse aliquid nisi, corrupti itaque, officiis minus aperiam eos iste, recusandae, rerum necessitatibus adipisci. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt aspernatur blanditiis optio eaque cumque vitae necessitatibus assumenda repudiandae, aut placeat quisquam ea accusamus, repellendus quas commodi porro perferendis expedita sunt.</p>
                <blockquote>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae aliquid consectetur facere quasi. Possimus et repellat maxime eos blanditiis ipsa nostrum soluta assumenda reprehenderit. Architecto non expedita rerum vel et.
                    <cite>Person Name</cite>
                </blockquote>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti fuga nostrum soluta totam sit magnam esse aliquid nisi, corrupti itaque, officiis minus aperiam eos iste, recusandae, rerum necessitatibus adipisci. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt aspernatur blanditiis optio eaque cumque vitae necessitatibus assumenda repudiandae, aut placeat quisquam ea accusamus, repellendus quas commodi porro perferendis expedita sunt.</p>
                <h3>Heading 3</h3>
                <ul>
                    <li>unordered list item</li>
                    <li>unordered list item</li>
                    <li>unordered list item</li>
                    <li>unordered list item</li>
                    <li>unordered list item</li>
                    <li>unordered list item</li>
                </ul>
                <h4>Heading 4</h4>
                <ol>
                    <li>ordered list item</li>
                    <li>ordered list item</li>
                    <li>ordered list item</li>
                    <li>ordered list item</li>
                    <li>ordered list item</li>
                    <li>ordered list item</li>
                </ol>
                <h5>Heading 5</h5>
                <h6>Heading 6</h6>
            </Typography>
        );
    }
}
