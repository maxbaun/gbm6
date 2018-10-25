const Head = ({title, image, description, url}) => {
	return (
		<Helmet
			title={fields.title}
			meta={[
				{property: 'og:image', content: pageImage.fields.file.url},
				{property: 'og:type', content: 'website'},
				{property: 'og:title', content: fields.title}
			]}
		/>
	);
};
