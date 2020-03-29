from pybuilder.core import init, use_plugin

# do not define name or version in init or plugins will not see those settings (at least sphinx)
name = 'coding-challenge-python-1'
version = '0.0.1'


use_plugin('python.core')
use_plugin('python.unittest')
use_plugin('python.coverage')
use_plugin('python.install_dependencies')
use_plugin('python.distutils')
use_plugin('python.flake8')
use_plugin('python.integrationtest')
use_plugin('python.sphinx')

default_task = ['clean', 'analyze', 'publish']


@init
def initialize(project):
    # coverage properties
    project.set_property('coverage_break_build', False)
    project.set_property('coverage_threshold_warn', 80)
    project.set_property('coverage_branch_threshold_warn', 80)
    project.set_property('coverage_branch_partial_threshold_warn', 80)

    # linting
    project.set_property('flake8_break_build', True)
    project.set_property('flake8_include_test_sources', True)
    project.set_property('flake8_verbose_output', True)

    # project structure
    project.set_property('dir_source_main_python', 'src/main')

    # unittest properties
    project.set_property('dir_source_unittest_python', 'src/test')
    project.set_property('unittest_module_glob', 'test_*')

    # integration tests properties
    # project.set_property('integrationtest_inherit_environment', True)
    # project.set_property('dir_source_integrationtest_python', 'src/integration_test')
    # project.set_property('integrationtest_file_glob', 'test_*')

    # dist properties
    project.set_property('dir_dist', 'target/dist/'+project.name+'-'+project.version)

    # upload to pypi-private
    project.set_property('distutils_upload_repository', 'nexus-gfk')

    # doc properties
    project.set_property("sphinx_config_path", "docs/")
    project.set_property("sphinx_source_dir", "docs/")
    project.set_property('sphinx_output_dir', 'target/docs/')
    project.set_property('sphinx_run_apidoc', True)
