require 'sass-globbing'
require 'susy'

http_path                  = "/"
http_stylesheets_path      = "#{http_path}css"
http_javascripts_path      = "#{http_path}js"
http_images_path           = "#{http_path}images"

generated_images_dir       = "../../public/img/sprites"
http_generated_images_path = "#{http_path}/img/sprites"

css_dir                    = "../../public/css"
sass_dir                   = "../scss"
images_dir                 = "../../public/img_src"

output_style               = (environment == :production) ? :compressed : :expanded
relative_assets            = false

##
# Overwriting filenames for generated sprite images
# Compass prints <http_path>/<images_dir> instead of <http_stylesheets_path>
##
on_stylesheet_saved do |filename|
    fileContents = File.read(filename)
    updatedContents = fileContents.gsub(http_path + images_dir, http_images_path)
    File.open(filename, "w") {|file| file.puts updatedContents}
end
