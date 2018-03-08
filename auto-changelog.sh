#!/bin/sh

if [[ $(git tag -l "$APP_VERSION") != $APP_VERSION ]]; then
	auto-changelog -o CHANGELOG-$APP_VERSION.md -l false
	cd ..
	git clone --depth=2 --branch=gh-pages https://github.com/$GIT_USER/$GIT_REPO.git repo
	cd repo
	mkdir changelogs
	cd changelogs
	mv ../../$GIT_REPO/CHANGELOG-$APP_VERSION.md CHANGELOG-$APP_VERSION.md
	cd ..
	git add .
	git commit -m "Changelog $APP_VERSION"
	git push "https://$GIT_KEY@github.com/$GIT_USER/$GIT_REPO.git"
	cd ..
	cd $GIT_REPO
	export DO_RELEASE="true"
fi
