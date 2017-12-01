<?php
/**
 * The front page template file
 *
 * If the user has selected a static page for their homepage, this is what will
 * appear.
 * Learn more: https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">
		<div id="Filters">
			<form style="display: block; margin: 0 auto 25px;">
				<div class="form-wrap">
					<div class="form-group">
						<label>Type in your search, or try an <button class="advanced">Advanced Search</button></label>
						<input type="text" id="Search" />
						<ul class="search-return"></ul>
					</div>
					<div class="form-group">
						<label>Choose the form of your destructor</label>
						<select>
							<?php
								$cat = get_categories();
								for ($z = 0; $z < sizeof($cat); $z++){
									$option = $cat[$z]->name != '' ? '<option data-cat-id="' . $cat[$z]->term_id . '">' . $cat[$z]->name . '</option>' : '';
									echo $option;
								}
							?>
						</select>
					</div>
				</div>
			</form>
		</div>
		<div id="PostCont"></div>
		<!-- <button id="LoadMore" style="display: block; width: 200px; margin: 0 auto;" data-load="0">Load Posts</button> -->
	</main><!-- #main -->
</div><!-- #primary -->

<?php get_footer();
