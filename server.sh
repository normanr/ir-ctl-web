#!/bin/bash
bind_host=localhost
port=8000
live=0
directory=.
target=index.html
args=()
while (( "$#" )); do
	case $1 in
	-b|--bind|--host)
		shift
		bind_host="$1"
		;;
	-p|--port)
		shift
		port="$1"
		;;
	--live)
		live=1
		;;
	-d|--directory)
		shift
		directory="$1"
		;;
	-t|--target)
		shift
		target="$1"
		;;
	-v|--verbose)
		shift
		args+=("-d")
		;;
	*)
		args+=("$1")
		;;
	esac
	shift
done
if [[ $live -eq 0 ]]; then
	echo cd "${directory}" \; python3 -m http.server --cgi -b "${bind_host}" "${args[@]}" "${port}"
	cd "${directory}" ; exec python3 -m http.server --cgi -b "${bind_host}" "${args[@]}" "${port}"
else
	echo livereload --host "${bind_host}" -p "${port}" -t "${target}" -w 0.1 "${args[@]}" "${directory}"
	exec livereload --host "${bind_host}" -p "${port}" -t "${target}" -w 0.1 "${args[@]}" "${directory}"
fi
