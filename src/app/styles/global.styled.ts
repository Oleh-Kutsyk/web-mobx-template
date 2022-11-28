import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	html,
	body,
	.root {
		height: 100%;
		min-height: 100%;
		font-size: 10px;
	}

	body {
		background-color: #E5E5E5;
    height: auto;
    min-height: auto;

  }

	.hidden {
		display: none;
	}

	.image-svg-base,
	img{
		/* display: default(inline) */
		vertical-align: middle;
		max-width: 100%;
		height: auto;
	}

	@keyframes rotate{
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
`;
