<?php
/**
 * Template Name: Video Page
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>
<div class="map-vids">
	<div class="map-cont">
		<div id="GoogleMap">
		</div>
	</div>
	<div id="primary" class="content-area videos-sidebar">
		<main id="main" class="site-main video-page" role="main">
			<head>
				<h1>Find Videos</h1>
			</head>
			<form class="video-search">
				<input id="Address" type="search" placeholder="Search for a Video">
				<input id="Submit" type="submit" value="Search by Location">
				<button class="advanced">+ Advanced Search +</button>
				<input id="Keyword" class="full-width" placeholder="Add Keywords">
				<select id="Radius" class="full-width">
					<option value="">Select Radius</option>
					<option value="1mi">1mi</option>
					<option value="5mi">5mi</option>
					<option value="10mi">10mi</option>
					<option value="50mi">50mi</option>
					<option value="100mi">100mi</option>
				</select>
			</form>
			<ul class="results videos"></ul>
		</main><!-- #main -->
	</div><!-- #primary -->
</div><!-- .map-vids -->
<?php get_footer();
